import * as React from "react"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className}`}
        ref={ref}
        {...props}
      />
      <svg
        className="absolute left-0 top-0 h-4 w-4 opacity-0 peer-checked:opacity-100 text-white pointer-events-none"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }