import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dzhreh0l9",
  api_key: "639833763345542",
  api_secret: "orfz0EeOntU3OxcnWCNGzEWDtPI",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
