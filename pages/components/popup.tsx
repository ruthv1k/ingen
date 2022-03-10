interface Props {
  popup: {
    isOpen: boolean
    chosenDate: string
  }
  setChosenDate: (e: React.ChangeEvent<HTMLInputElement>) => void
  setTaskTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  setDescription: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFrom: (e: React.ChangeEvent<HTMLInputElement>) => void
  setTo: (e: React.ChangeEvent<HTMLInputElement>) => void
  setPopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean
      chosenDate: string
    }>
  >
  submitForm: (chosenDate: string) => void
}

const Popup: React.FC<Props> = ({
  popup,
  setChosenDate,
  setPopup,
  setTaskTitle,
  setDescription,
  setFrom,
  setTo,
  submitForm,
}) => {
  return (
    <div className="overlay">
      <div className="popup rounded-md border bg-white md:w-11/12 lg:max-w-[800px]">
        <div className="popup-contents px-6 py-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">
              Schedule tasks for {popup.chosenDate}
            </h3>
            <button
              onClick={() => setPopup({ ...popup, isOpen: false })}
              className="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-dark h-6 w-6"
                fill="current"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            <label htmlFor="form_title" className="block pb-2">
              What's the task?
            </label>
            <input
              type="text"
              placeholder="Schedule a meet with the team..."
              id="form_title"
              className="border-border-light w-full border px-4 py-2 focus:outline-none"
              onChange={setTaskTitle}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="add_field" className="block pb-2">
              Any message you want to add to the task?
            </label>
            <input
              type="text"
              placeholder="Get feedback about the progress and look for any blockers"
              id="form_title"
              className="border-border-light w-full border px-4 py-2 focus:outline-none"
              onChange={setDescription}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="add_field" className="block pb-2">
              Time Slot
            </label>
            <div className="flex w-1/2 items-center justify-between">
              <div>
                <label htmlFor="from">From</label>
                <input
                  type="time"
                  placeholder="From"
                  id="fromTime"
                  className="border-border-light ml-4 border px-4 py-2 focus:outline-none"
                  onChange={setFrom}
                />
              </div>
              <div>
                <label htmlFor="to">To</label>
                <input
                  type="time"
                  placeholder="To"
                  id="toTime"
                  className="border-border-light ml-4 border px-4 py-2 focus:outline-none"
                  onChange={setTo}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="border border-light-theme-primary bg-light-theme-primary px-6 py-3 text-white transition-all duration-150 ease-linear hover:bg-transparent hover:text-light-theme-primary"
              onClick={() => submitForm(popup.chosenDate)}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
