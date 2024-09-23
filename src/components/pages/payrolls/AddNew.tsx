import { Button, Modal } from "antd";
import useAddNewPayroll from "../../../hooks/useAddNewPayroll"; // Updated hook
import FormBuilder from "../../utils/FormBuilder";

function AddNew() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewPayroll(); // Updated hook

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Payroll" // Updated title
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
