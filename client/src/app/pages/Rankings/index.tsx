import { MainContentBlock } from 'app/components'
import { HOF } from './HOF'

export const Rankings = () => {
  return (
    <div>
      <HOF />
      <MainContentBlock>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>
                level<span className='reset'>reset</span>
              </th>
              <th>strength</th>
              <th>agility</th>
              <th>vitality</th>
              <th>energy</th>
              <th>command</th>
              <th>free points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>
                400<span className='reset'>3</span>
              </td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>4,444</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>
                400<span className='reset'>3</span>
              </td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>4,444</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Dea7h</td>
              <td>
                400<span className='reset'>3</span>
              </td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>32,000</td>
              <td>4,444</td>
            </tr>
          </tbody>
        </table>
      </MainContentBlock>
    </div>
  )
}
