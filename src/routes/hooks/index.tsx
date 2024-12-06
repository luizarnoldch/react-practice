import UseStateHook from "../../components/state_hooks/UseStateHook"

const HooksPage = () => {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto w-full">
        <h3 className="text-3xl">
          State Hooks
        </h3>
        <UseStateHook />
      </div>
    </div>
  )
}

export default HooksPage