import { Button, Flex, Modal, Tag } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import FormBuilder from "../../utils/FormBuilder";
import useAddVehicleExpense from "../../../hooks/useAddVehicleExpense";

interface Props {
  vehicle: VehiclesAndDestination;
}

function AddExpense({ vehicle }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useAddVehicleExpense({ vehicleId: vehicle.id });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Add Expense
      </Button>
      <Modal
        footer={null}
        title="Add Vehicle Expense"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <>
          <div className="mb-5">
            <Flex gap="4px 0" wrap>
              <Tag color="processing">{vehicle.item}</Tag>
            </Flex>
          </div>

          <FormBuilder
            formConfig={formConfig}
            onSubmit={handleSubmit}
            loading={isLoading}
          />
        </>
      </Modal>
    </>
  );
}

export default AddExpense;
