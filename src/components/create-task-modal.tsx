import CreateTaskForm from './create-task-form';
import Modal from './ui/modal';

const CreateTaskModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className='dark:bg-dark-theme-primary max-w-2xl'
    >
      <CreateTaskForm />
    </Modal>
  );
};

export default CreateTaskModal;
