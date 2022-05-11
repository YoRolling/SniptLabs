import { Stack, Box, Text, Group, Badge } from '@mantine/core'

export default function SinppentItem(props: {
  item: Snippent
  onClick: () => void
}) {
  const {
    item: { name, tags },
    item,
  } = props
  return (
    <Stack
      className='mx-2 item p-2 rounded bg-slate-50 cursor-pointer'
      onClick={props.onClick}
      sx={(theme) => ({
        '&.active,&:hover': {
          color: '#FFF',
          backgroundColor: theme.colors.indigo['4'],
        },
      })}
    >
      <Box className='item-header flex items-center gap-4px'>
        <Text className='item-title font-mono'>{name}</Text>
      </Box>
      <Box className='mt-2'>
        <Badge color='grape' className='uppercase text-xs font-mono'>
          {item.language}
        </Badge>
        <Group>
          {tags?.map((v) => (
            <Badge key={v.id}>{v.name}</Badge>
          ))}
        </Group>
      </Box>
    </Stack>
  )
}
