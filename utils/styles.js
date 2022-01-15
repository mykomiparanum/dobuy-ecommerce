import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white',
  },
  navLinks: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    textAlign: 'center',
  },
})

export default useStyle
