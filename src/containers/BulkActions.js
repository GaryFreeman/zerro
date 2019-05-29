import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  getSelectedIds,
  uncheckAllTransactions
} from '../store/selectedTransactions'
import {
  setMainTagToTransactions,
  deleteTransactions
} from '../store/data/thunks'
import { Button } from 'antd'
import TagSelect from './TagSelect'
import pluralize from '../Utils/pluralize'

const Num = styled.h3`
  text-align: center;
  padding-bottom: 4px;
`

const StyledButton = styled(Button)`
  margin-top: 16px;
`

const StyledSelect = styled(TagSelect)`
  margin-top: 16px;
`

class BulkActions extends React.Component {
  onSetTag = tagId => {
    this.props.setTag(this.props.selectedIds, tagId)
  }
  onDelete = () => {
    this.props.delete(this.props.selectedIds)
  }

  render() {
    const num = this.props.selectedIds.length

    if (!num) return null
    return (
      <div className={this.props.className}>
        <Num>
          {num} {pluralize(num, ['операция', 'операции', 'операций'])}
        </Num>

        <StyledButton type="link" block onClick={this.props.uncheckAll}>
          Снять выделение
        </StyledButton>

        <StyledSelect
          single
          onChange={this.onSetTag}
          placeholder="Выставить категорию"
        />

        <StyledButton type="danger" block onClick={this.onDelete}>
          Удалить выбранные ({num})
        </StyledButton>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setTag: (ids, tagId) => dispatch(setMainTagToTransactions(ids, tagId)),
  delete: ids => dispatch(deleteTransactions(ids)),
  uncheckAll: () => dispatch(uncheckAllTransactions())
})

export default connect(
  state => ({ selectedIds: getSelectedIds(state) }),
  mapDispatchToProps
)(BulkActions)