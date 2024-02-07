import { pool } from "../db.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
// GET /students
export const getstudents = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tblEstudiante");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET /students/:{id}
export const getStudent = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tblEstudiante WHERE cDni = ?",
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ message: "Estudiante no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createStudents = async (req, res) => {
  try {
    const { cDni, vNombres, vApellido_p, vApellido_m, estado } = req.body;
    let image;
    if (req.files?.image) {
      try {
        const result = await uploadImage(req.files.image.tempFilePath);
        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        await fs.remove(req.files.image.tempFilePath);
        console.log(result);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        res.status(500).json({ message: "Error al subir la imagen" });
        return;
      }
    }

    const [result] = await pool.query(
      "INSERT INTO tblEstudiante(cDni, vNombres, vApellido_p, vApellido_m, estado, url, public_id) VALUES(?,?,?,?,?,?,?)",
      [cDni, vNombres, vApellido_p, vApellido_m, estado, image?.url || null,
        image?.public_id || null,]
    );
    res.json({
      id: result.insertId,
      vNombres,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateStudents = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tblEstudiante SET ? WHERE cDni = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudents = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM tblEstudiante WHERE cDni = ?",
      [req.params.id]
    );
    if(result.public_id) {
      await deleteImage(result.public_id)
    }else{
      return res.sendStatus(204)
    }
    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
