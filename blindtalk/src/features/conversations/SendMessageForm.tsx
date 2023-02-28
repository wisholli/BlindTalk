import { Formik, Form, Field } from "formik";

type Props = {
  sendNewMessage: (content: string) => void;
};

export const SendMessageForm = ({ sendNewMessage }: Props) => {
  const initialValues = { content: "" };
  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={initialValues}
        onSubmit={({ content }) => {
          sendNewMessage(content);
        }}
      >
        <Form className="flex justify-between items-center box-border h-50 w-full p-4 border-2 rounded-md bg-basic-gray-5">
          <div className="mb-2">
            <div className="mb-1">
              <Field
                id="content"
                name="content"
                placeholder="Writte message"
                className="bg-gray-5"
              />
            </div>
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SendMessageForm;
