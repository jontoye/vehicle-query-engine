import { BugOff } from "lucide-react"

export const ListEmpy = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-96 bg-slate-300">
      <BugOff size={40} />
      <h2 className="text-xl font-bold">No Results</h2>
    </div>
  )
}
