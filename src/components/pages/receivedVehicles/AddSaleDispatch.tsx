import { Button, Modal } from "antd";
import useAddSaleDispatch from "../../../hooks/useAddSaleDispatch";
import FormBuilder from "../../utils/FormBuilder";
import { VehiclesAndDestination } from "../../../types/db";

interface Props {
  vehicle: VehiclesAndDestination;
}

function AddSaleDispatch({ vehicle }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddSaleDispatch({ vehicle });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add New
      </Button>
      <Modal
        footer={null}
        title="Add New"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      </Modal>
    </>
  );
}

export default AddSaleDispatch;
