import { Box, Container } from '@mui/material'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxWidth="md">
      <Box>{children}</Box>
    </Container>
  )
}
