import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'

export default class MyProjectPlugin extends Plugin {
  name = 'MyProject'

  install(pluginManager: PluginManager) {
    const { jbrequire } = pluginManager
    const { types } = pluginManager.lib['mobx-state-tree']
    const React = pluginManager.lib['react']

    const ViewType = jbrequire('@jbrowse/core/pluggableElementTypes/ViewType')
    const stateModel = types
      .model({ type: types.literal('HelloView') })
      .actions(() => ({
        setWidth() {
          // unused but required by your view
        },
      }))

    function ReactComponent() {
      const [pushed, setPushed] = React.useState('')
      return (
        <div style={{ padding: 50 }}>
          <h1>Hello bioinformaticians!</h1>
          <button
            onClick={() => {
              setPushed('heck ya, ya pushed the button')
            }}
          >
            Push the button
          </button>
          <p>{pushed}</p>
        </div>
      )
    }

    pluginManager.addViewType(() => {
      return new ViewType({ name: 'HelloView', stateModel, ReactComponent })
    })
  }

  configure(pluginManager: PluginManager) {
    // @ts-ignore
    pluginManager.rootModel.appendToSubMenu(['File', 'Add'], {
      label: 'Open Hello!',
      // @ts-ignore
      onClick: session => {
        session.addView('HelloView', {})
      },
    })
  }
}
