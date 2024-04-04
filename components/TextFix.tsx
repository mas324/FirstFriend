import React from 'react';
import * as Native from 'react-native';

export class Text extends React.Component<Native.TextProps> {
  render() {
    const { children, style, ...rest } = this.props

    return (
      <Native.Text style={[style,
        {
          ...Native.Platform.select({
            android: {
              fontFamily: 'monospace',
            },
          })
        }]} {...rest}>
        {children}
      </Native.Text>
    )
  }
}
