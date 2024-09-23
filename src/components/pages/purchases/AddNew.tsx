import { Button, Modal } from "antd";
import useAddNewPurchase from "../../../hooks/useAddNewPurchase";
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewPurchase();

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Item"
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

export default AddNew;
