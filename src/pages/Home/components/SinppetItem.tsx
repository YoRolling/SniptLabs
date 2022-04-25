import { Stack, Box, Text, Group, Badge } from '@mantine/core'

export default function SinppentItem(props: {
  item: Snippent
  onClick: () => void
}) {
  const {
    item: { name, tags },
  } = props
  return (
    <Stack className='item p-2 cursor-pointer' onClick={props.onClick}>
      <Box className='item-header'>
        <Box className='item-title'>
          <Text>{name}</Text>
        </Box>
      </Box>
      <Box className='mt-2'>
        <Group>
          {tags?.map((v) => (
            <Badge key={v.id}>{v.name}</Badge>
          ))}
        </Group>
      </Box>
    </Stack>
  )
}
