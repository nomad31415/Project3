import React from 'react'
import ir from '../ir.svg'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
const options = [
  {
    type: 'group',
    name: 'Mobilenet v2 Model',
    items: [
      {
        value: 'mobilenetv2',
        label: '90% Accurate - Small and fast'
      }
    ]
  },
  {
    type: 'group',
    name: 'Inception v3 Model',
    items: [{ value: 'inceptionv3', label: '93% Accurate - Large and slow' }]
  }
]

export default props => (
  <div>
    <div className="modelPicker">
      <p>Currently Using:</p>
      <Dropdown
        options={options}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
    <footer>
      <div>
      <a href="https://github.com/nomad31415">Copyright nsfwjs & igorZ</a>
      </div>
      <div>
        <a href="https://github.com/gantman/nsfw_model">Model Repo</a>
      </div>
      <div>
        <a href="https://scikit-learn.org/stable/index.html">
          Blog Post
        </a>
      </div>
      <div>
        <a href="https://infinite.red">
          <img src={ir} alt="infinite red logo" />
        </a>
      </div>
    </footer>
  </div>
)
