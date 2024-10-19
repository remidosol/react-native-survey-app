import { useEffect } from "react";
import { StoredUserData } from "../types/auth";
import { UseSaveUserDataProps } from "../types/props";
import { getUserData, saveUserData } from "../utils/userStorage";

const useSaveUserData = ({ user, token }: UseSaveUserDataProps) => {
  useEffect(() => {
    const saveUserDataToStore = async () => {
      try {
        let userData = await getUserData();

        if (userData) {
          userData = {
            ...userData,
            user,
            token,
          };
        } else {
          userData = {};

          userData = {
            ...userData,
            user,
            token,
          };
        }

        await saveUserData(userData);
        console.log(JSON.stringify(userData, null, 2));
        console.log("User saved successfully");
      } catch (error) {
        console.error("Error saving user", error);
      }
    };

    saveUserDataToStore();
  }, [user?.id, token]);
};

export default useSaveUserData;
