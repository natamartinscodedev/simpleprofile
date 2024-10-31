'use client'

import {
  ref,
  getDownloadURL,
  uploadBytesResumable
} from 'firebase/storage'
import { storage } from "@/firebase/firebase";

export const uploadMedia  = async (file: any)=> {
  if (!file) return null;

  const storageRef = ref(storage, `midia/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setPorgessPorcent(progress);
      console.log("Proguess ==>", progress)
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       return downloadURL
      });
    }
  );
};
