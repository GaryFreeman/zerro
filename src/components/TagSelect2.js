import React from 'react'
import { connect } from 'react-redux'
import { TreeSelect } from 'antd'
import { getTagsTree } from 'store/data/tags'
import {
  Typography,
  Popover,
  Button,
  Paper,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EmojiIcon from 'components/EmojiIcon'

function TagSelect({ tags, onTagSelect, trigger }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger, { onClick: handleClick })
      ) : (
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      )}
      <TagSelectPopover
        tags={tags}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onTagSelect={id => {
          console.log(id)
        }}
      />
    </>
  )
}

export default connect(
  state => ({ tags: getTagsTree(state) }),
  null
)(TagSelect)

// WIP
function TagSelectPopover({
  tags,
  open,
  anchorEl,
  incomeOnly,
  outcomeOnly,
  selectedIds,
  onTagSelect,
  onClose,
}) {
  const [search, setSearch] = React.useState('')

  const checkSearch = (tag, search) => {
    const includes = (title, search) =>
      title.toUpperCase().includes(search.toUpperCase())
    if (includes(tag.title, search)) return true
    return (
      tag.children && tag.children.some(child => includes(child.title, search))
    )
  }

  const checkTag = tag =>
    checkSearch(tag, search) &&
    (!incomeOnly || tag.showIncome) &&
    (!outcomeOnly || tag.showOutcome)

  const filtered = tags
    .filter(checkTag)
    .map(tag =>
      tag.children ? { ...tag, children: tag.children.filter(checkTag) } : tag
    )

  const handleClick = id => () => {
    onTagSelect(id)
    onClose()
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box pt={1} px={1} position="sticky" top={0} zIndex={10} clone>
        <Paper square elevation={0}>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            variant="outlined"
            placeholder="Выберите категории"
            fullWidth
            autoFocus
          />
        </Paper>
      </Box>
      <List>
        {filtered.map(tag => (
          <React.Fragment key={tag.id + 'frag'}>
            <TagOption
              key={tag.id}
              tag={tag}
              onClick={handleClick(tag.id)}
              selected={selectedIds && selectedIds.find(tag.id)}
            />
            {tag.children &&
              tag.children.map(tag => (
                <TagOption
                  key={tag.id}
                  tag={tag}
                  onClick={handleClick(tag.id)}
                  isChild
                />
              ))}
          </React.Fragment>
        ))}
      </List>
    </Popover>
  )
}

function TagOption({ tag, isChild, ...rest }) {
  return (
    <ListItem button {...rest}>
      <EmojiIcon symbol={tag.symbol} mr={2} ml={isChild ? 5 : 0} />
      <ListItemText primary={tag.name}></ListItemText>
    </ListItem>
  )
}
