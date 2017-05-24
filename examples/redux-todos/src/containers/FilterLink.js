import React from 'react'
import recycle, { registerReducer } from 'recycle'
import { setVisibilityFilter } from '../actions'

const FilterLink = recycle({
  dispatch (sources) {
    return [
      sources.select('a')
        .addListener('onClick')
        .map(e => e.preventDefault())
        .withLatestFrom(sources.props)
        .map(([e, props]) => setVisibilityFilter(props.filter))
    ]
  },

  update (sources) {
    return [
      sources.store
        .let(registerReducer((state, store) => store))
    ]
  },

  view (props, state) {
    if (props.filter === state.visibilityFilter) {
      return <span>{props.children}</span>
    }

    return <a href="#">{props.children}</a>
  }
})

export default FilterLink
