import { Button, Modal } from "antd";
import useAddNewExpense from "../../../hooks/useAddNewExpense"; // Updated hook
import FormBuilder from "../../utils/FormBuilder";

function AddNewExpense() {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddNewExpense(); // Updated hook

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add New
      </Button>
      <Modal
        footer={null}
        title="Add New Expense" // Updated title
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

export default AddNewExpense;
