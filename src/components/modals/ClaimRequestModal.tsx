import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXTextarea from "../form/FXTextArea";

import FXModal from "./FXModal";
import { TComment } from "@/types";

interface IProps {
  id: string;
  comments: TComment[];
}

export default function ClaimRequestModal({ id, comments }: IProps) {
  // const { mutate: handleClaimRequest, isPending } = useAddClaimRequest();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // const claimRequestData = {
    //   item: id,
    //   description: data.description,
    //   answers: Object.keys(data)
    //     .filter((formElement) => formElement.startsWith("answer"))
    //     .map((answer) => data[answer]),
    // };

    // handleClaimRequest(claimRequestData);
  };

  return (
    <FXModal
      buttonClassName="flex-1"
      buttonText="Claim Request"
      title="Claim Request"
    >
      <FXForm onSubmit={onSubmit}>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <p className="mb-1">{comment.text}</p>
            <FXInput
              label={`Answer - ${index + 1}`}
              name={`answer-${index + 1}`}
            />
          </div>
        ))}

        <FXTextarea label="Description" name="description" />

        {/* <div>
          <Button className="w-full flex-1 my-2" size="lg" type="submit">
            {isPending ? "Sending...." : "Send"}
          </Button>
        </div> */}
      </FXForm>
    </FXModal>
  );
}
