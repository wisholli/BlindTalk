import { Formik, Form, Field } from "formik";

type Props = {
  sendNewMessage: (content: string) => void;
};

export const SendMessageForm = ({ sendNewMessage }: Props) => {
  const initialValues = { content: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ content }) => {
        sendNewMessage(content);
      }}
    >
      <Form className="flex justify-between items-center mx-4 mb-2 border-b-2 border-black-200 lg:mb-10 lg:mx-16 lg:gap-10">
        <div className="w-full lg:ml-2">
          <Field
            id="content"
            name="content"
            placeholder="Writte message"
            className="outline-none font-maven font-normal text-xl text-black-100 placeholder:font-maven placeholder:font-normal placeholder:text-xl placeholder:text-gray-100 lg:text-3xl lg:placeholder:text-3xl"
          />
        </div>
        <button
          type="submit"
          className="px-10 py-1 mb-2 border-none rounded-3xl bg-green-100 font-maven font-medium text-lg text-white lg:py-2 lg:px-14 lg:mb-2 lg:mr-2"
        >
          Send
        </button>
      </Form>
    </Formik>
  );
};

export default SendMessageForm;
