import { Form } from "@/components/Form";

export default function Home() {
  return (
    <div className=" bg-gray-950 w-full h-screen flex items-center justify-center">
      <div className="-mt-10">
        <h1 className="text-4xl font-black font-mono text-gray-50">Criar um link curto!</h1>
          <Form />
      </div>
    </div>
  )
}
