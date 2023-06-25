import { useFormik } from "formik";
import { EditMessageData } from "../../types";
import { useAppSelector } from "../../app/hooks";

type Props = {
  sendNewMessage: (content: string) => void;
  handleEditMessage: (newData: EditMessageData) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const SendMessageForm = ({
  inputRef,
  sendNewMessage,
  handleEditMessage,
}: Props) => {
  const messageId = useAppSelector((state) => state.messages.editMessageId);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values, { resetForm }) => {
      let content = values.content;
      if (messageId) {
        return handleEditMessage({ messageId, content });
      }
      sendNewMessage(content);
      resetForm({ values });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-between items-center mx-4 mb-2 border-b-2 border-black-200 lg:mb-10 lg:mx-16 lg:gap-10"
    >
      <div className="w-full ml-2">
        <input
          id="content"
          name="content"
          ref={inputRef}
          value={
            inputRef.current ? inputRef.current.value : formik.values.content
          }
          onChange={formik.handleChange}
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
    </form>
  );
};

export default SendMessageForm;
