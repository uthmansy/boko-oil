import { Button, Modal } from "antd";
import useEditVechicle from "../../../hooks/useEditVechicle"; // Adjust import as necessary
import FormBuilder from "../../utils/FormBuilder";
import { VehiclesAndDestination } from "../../../types/db";

interface Props {
  vehicle: VehiclesAndDestination;
}

function EditVechicle({ vehicle }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditVechicle({ vehicle }); // Adjust hook name and logic as necessary

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Edit Vehicle
      </Button>
      <Modal
        footer={null}
        title="Edit Vehicle"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={800}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          columns={1}
        />
      </Modal>
    </>
  );
}

export default EditVechicle;
