import Fix from '@/_components/Fix/fix'
import Admin from '@/_components/Admin/admin'

export default function AdminPage() {
  return (
    <div className="flex">
      <Fix />
      <div className="mx-[270px] my-[70px]">
        <Admin />
      </div>
    </div>
  )
}
