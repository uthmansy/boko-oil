import { Button, Flex, Modal, Tag } from "antd";
import FormBuilder from "../../utils/FormBuilder";
import useReceiveVehicle from "../../../hooks/useReceiveVehicle";
import { VehiclesAndDestination } from "../../../types/db";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { formatNumber } from "../../../helpers/functions";

interface Props {
  vehicle: VehiclesAndDestination;
}

function ReceiveVehicle({ vehicle }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
    shortage,
    onValuesChange,
  } = useReceiveVehicle({ vehicle });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Receive
      </Button>
      <Modal
        footer={null}
        title="Receive Vehicle"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <div className="mb-5">
          <Flex gap="4px 0" wrap>
            <Tag icon={<SyncOutlined spin />} color="processing">
              {vehicle.item}
            </Tag>
            <Tag icon={<CheckCircleOutlined />} color="success">
              Carried: {formatNumber(vehicle.qty_carried)} BAGS
            </Tag>
            <Tag icon={<CloseCircleOutlined />} color="error">
              Shortage: {formatNumber(shortage)} BAGS
            </Tag>
          </Flex>
        </div>

        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          onChange={onValuesChange}
        />
      </Modal>
    </>
  );
}

export default ReceiveVehicle;
