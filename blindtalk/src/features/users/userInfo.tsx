import { NewConversationData, UserData } from "../../types";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

interface Props extends UserData {
  createConversation: ({ message, recipientId }: NewConversationData) => void;
}

const UserInfo = ({ firstName, lastName, createConversation, id }: Props) => {
  const initialValues: NewConversationData = { message: "", recipientId: id };
  return (
    <div className="flex justify-between text-xl my-5">
      <div className="flex ml-20">
        <p className="mr-1">{firstName}</p>
        <p>{lastName}</p>
      </div>

      <div className="ml-40 mr-20">
        <Formik
          initialValues={initialValues}
          onSubmit={({ message, recipientId }) => {
            createConversation({ message, recipientId });
          }}
        >
          <Form>
            <Field
              id="message"
              name="message"
              placeholder="Write first message"
            />
            <button type="submit" className="ml-2">
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UserInfo;
