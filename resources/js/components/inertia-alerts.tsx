import { AlertNotification } from "./alert-notification"
import { useEffect, useState } from "react"
import { usePage } from "@inertiajs/react"
import { PageProps } from '@inertiajs/core'


interface FlashMessages {
    success?: string;
    error?: string;
  }

  interface InertiaPageProps extends PageProps {
    flash?: FlashMessages;
  }

export function InertiaAlerts() {
    const { props } = usePage<InertiaPageProps>()

    const [showAlert, setShowAlert] = useState(false)
    const [alertProps, setAlertProps] = useState<{
    type: "success" | "error"
    title: string
    message: string
  } | null>(null)


  useEffect(() => {
    // Acesse flash diretamente das props
    const flash = props.flash

    if (flash?.success) {
      setAlertProps({
        type: "success",
        title: "Sucesso!",
        message: flash.success,
      })
      setShowAlert(true)

      // Limpe a mensagem após mostrar
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }

    if (flash?.error) {
      setAlertProps({
        type: "error",
        title: "Erro!",
        message: flash.error,
      })
      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }
  }, [props.flash]) // Observe apenas props.flash

  if (!showAlert || !alertProps) return null

  return (
    <AlertNotification
      type={alertProps.type}
      title={alertProps.title}
      message={alertProps.message}
      onClose={() => setShowAlert(false)}
    />
  )
}
