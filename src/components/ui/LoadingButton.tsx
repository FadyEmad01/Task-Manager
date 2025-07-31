"use client"

import { LoaderCircle } from "lucide-react"
import React, { ComponentProps } from "react"
import { Button, buttonVariants } from "./button"
import { VariantProps } from "class-variance-authority"

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }


interface LoadingButtonProps extends ButtonProps{
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
}

export const LoadingButton = ({
  isLoading = false,
  disabled = false,
  children,
  ...props
}: LoadingButtonProps) => {
  const isButtonDisabled = isLoading || disabled

  return (
    <Button disabled={isButtonDisabled} {...props}>
      {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
