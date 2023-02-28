import { UserData } from "../../types";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { NavLink } from "react-router-dom";

interface Props extends UserData {
  createConversation: (recipientId: number) => void;
}

const UserInfo = ({ firstName, lastName, createConversation, id }: Props) => {
  return (
    <div className="flex justify-between text-xl my-5">
      <div className="flex ml-20">
        <p className="mr-1">{firstName}</p>
        <p>{lastName}</p>
      </div>
      <div className="ml-40 mr-20">
        <button onClick={() => createConversation(id)}>
          <NavLink to={"/conversation"}>Let's chat</NavLink>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
