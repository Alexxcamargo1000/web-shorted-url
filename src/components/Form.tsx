'use client'
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastAction } from "./ui/toast";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const schemaForm = z.object({
  url: z.string().url({message: 'Insira uma URL válida.'})
})

type formType = z.infer<typeof schemaForm>

export function Form() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<formType>({
    resolver: zodResolver(schemaForm)
  });
  const { toast } = useToast()

  async function handleSendUrl(data: formType) {

    try {
      
      const url = await api.post('short-url', {
        url: data.url
      }).then(response =>  response.data) 

      toast({
        open: true,
        title: "✅ Sucesso! ",
        
        description: url.url,
        action: <ToastAction altText="Copy"  className="border-0 hover:bg-transparent hover:opacity-60" onClick={() => {
          window.navigator.clipboard.writeText('colou')
        }}>Copy</ToastAction>,
        className: "bg-gray-900 text-gray-100 border-gray-700",
      })
    } catch (error) {
      toast({
        open: true,
        title: "❌ Aconteceu um erro! ",
        variant: "destructive",
        description: "tente novamente mais tarde.",
        action: <ToastAction altText="Tentar de novo"  className="border-0 hover:bg-transparent hover:opacity-60" onClick={() => {
        }}>Tentar de novo</ToastAction>,
        className: "bg-gray-900 text-gray-100 border-gray-700",
      })
    }


  }

  return (
    <form onSubmit={handleSubmit(handleSendUrl)} className="flex flex-col max-w-md mt-4">
      <legend className="text-gray-300 leading-9">
        Cole um link para deixa-lo curto. 
      </legend>
      <input 
        {...register('url')} 
        type="text" 
        placeholder="https://..." 
        className="py-3 px-2 rounded bg-gray-800 placeholder:text-gray-500 text-gray-100" 
      />
     <span className="block h-2 text-red-500 text-sm my-1">
     {errors.url && errors.url.message}
     </span>
      <button 
        type="submit" 
        className="bg-emerald-600 relative overflow-hidden text-gray-50 py-3 px-2 rounded mt-5 font-bold hover:bg-emerald-800 transition-colors disabled:opacity-90 disabled:cursor-default disabled:bg-gray-500 disabled:hover:bg-gray-500"
        disabled={isSubmitting}
      >
        <span className="flex-1 w-full block">Criar link curto</span> 
        {isSubmitting && (
          <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
             <Loader2 className="animate-spin"/>
          </div>
        )}
      </button>
    
    </form>
  )
}