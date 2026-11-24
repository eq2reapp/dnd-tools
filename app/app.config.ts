export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    main: {
      base: 'min-h-[calc(100vh-var(--ui-header-height)-var(--ui-footer-height))]'
    },
    formField: {
      defaultVariants: {
        size: 'xl'
      }
    },
    button: {
      defaultVariants: {
        size: 'xl'
      }
    },
    checkbox: {
      defaultVariants: {
        size: 'xl'
      }
    },
    table: {
      slots: {
        th: 'px-4 py-3.5 text-lg text-highlighted text-start font-semibold [&:has([role=checkbox])]:pe-0',
        td: 'p-4 text-lg text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0'
      }
    },
    alert: {
      slots: {
        title: 'text-lg font-medium',
        description: 'text-lg opacity-90',
        icon: 'shrink-0 size-7'
      }
    }
  }
})
