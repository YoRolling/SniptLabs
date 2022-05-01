import { createStyles } from '@mantine/core'
import React from 'react'
import { ChevronDown, ChevronRight } from 'tabler-icons-react'

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    // Dynamic media queries, define breakpoints in theme, use anywhere
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      // Type safe child reference in nested selectors via ref
      [`& .${getRef('child')}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  child: {
    // assign ref to element
    ref: getRef('child'),
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  summary: {
    ref: getRef('summary'),
    fontWeight: "bold",
    listStyle: 'none',
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    textTransform: 'capitalize',
    fontFamily: "'Operator Mono Light','LXGW WenKai Mono',Monaco,Hack",
    height: '40px',
    cursor: 'pointer',
  },
}))

export default function DetailNative({
  title,
  children,
}: React.PropsWithChildren<{ title: React.ReactChild }>) {
  const { classes } = useStyles()
  const [open, setOpen] = React.useState(false)
  const toggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const { open } = e.target as HTMLDetailsElement
    setOpen(open)
  }

  return (
    <details className={classes.wrapper} onToggle={toggle}>
      <summary className={classes.summary}>
        {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        {title}
      </summary>
      {children}
    </details>
  )
}
