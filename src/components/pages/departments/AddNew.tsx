import { Button, Modal } from "antd";
import useAddNewDepartment from "../../../hooks/useAddNewDepartment"; // Updated hook
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewDepartment(); // Updated hook

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Department" // Updated title
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
