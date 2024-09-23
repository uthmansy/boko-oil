import { Button, Modal } from "antd";
import useAddNewWarehouse from "../../../hooks/useAddNewWarehouse";
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewWarehouse();

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Warehouse"
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
