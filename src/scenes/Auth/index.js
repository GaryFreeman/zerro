import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Box, Button, Link, Fade } from '@material-ui/core'
import { logIn } from 'logic/authorization'
import ZenApi from 'services/ZenApi'
import { useTheme } from '@material-ui/styles'
import Logo from '../../components/Logo'
ZenApi.checkCode()

function Auth(props) {
  const theme = useTheme()
  const [logoIn, setLogoIn] = useState(false)
  setTimeout(() => setLogoIn(true), 300)
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box mb={5}>
        <Logo width="200" fill={theme.palette.primary.main} visible={logoIn} />
      </Box>

      <Fade in timeout={1000}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={props.logIn}
          children="Войти через Дзен-мани"
        />
      </Fade>

      <Fade in timeout={3000}>
        <Box mt={2}>
          <Link
            href="https://www.notion.so/ZERRO-a943f930d0a64d008712e20ecd299dbd"
            target="_blank"
            rel="noopener noreferrer"
            variant="body1"
            children="Что это такое?"
          />
        </Box>
      </Fade>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn()),
})

export default connect(null, mapDispatchToProps)(Auth)
