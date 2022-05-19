import { Box, Text, Group, Badge, UnstyledButton } from '@mantine/core'

export default function SinppentItem(props: {
  item: Snippet
  onClick: () => void
  active?: boolean
}) {
  const {
    item: { name },
    item,
  } = props
  return (
    <UnstyledButton
      component='div'
      className='flex flex-col mx-2 item p-2 rounded bg-slate-50 cursor-pointer gap-10px '
      sx={(theme) => ({
        '&.active,&:hover': {
          color: '#FFF',
          backgroundColor: theme.colors.indigo['4'],
        },
      })}
      onClick={props.onClick}
    >
      <Box className='item-header flex items-center gap-4px'>
        <Text className='item-title font-mono'>{name}</Text>
      </Box>
      <Box className='mt-2'>
        <Badge color='grape' className='uppercase text-xs font-mono'>
          {item.language}
        </Badge>
        <Group>
          {/* {tags?.map((v) => (
            <Badge key={v.id}>{v.name}</Badge>
          ))} */}
        </Group>
      </Box>
    </UnstyledButton>
  )
}
