import { Button, Flex, Modal, Tag } from "antd";
import usePackage from "../../../hooks/usePackage";
import { VehiclesAndDestination } from "../../../types/db";
import FormBuilder from "../../utils/FormBuilder";

interface Props {
  vehicle: VehiclesAndDestination;
}

function Package({ vehicle }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
    onValuesChange,
  } = usePackage({ vehicle });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Package
      </Button>
      <Modal
        footer={null}
        title="Package Vehicle"
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
            onChange={onValuesChange}
          />
        </>
      </Modal>
    </>
  );
}

export default Package;
