import ffetch from '../../scripts/ffetch.js'

let teamDataCache = null // Cache team data to avoid duplicate fetches

async function fetchTeamData () {
  if (!teamDataCache) {
    teamDataCache = await ffetch('/query-index.json').sheet('team').all()
  }
  return teamDataCache
}

export async function TeamMemberCard (
  username,
  options = { showName: true, showPosition: true, imageSize: 50 }
) {
  const teamData = await fetchTeamData()
  const member = teamData.find(member => member.Username === username)

  if (!member) return ''

  const { showName, showPosition, imageSize } = options

  return `
      <mj-column width="33%" padding="20px">
        <mj-image src="${member.Picture}" mj-class="mj-team-image" alt="${
    member.Name
  }" width="${imageSize}px" height="${imageSize}px" />
        ${
          showName
            ? `<mj-text mj-class="mj-team-name"><strong>${member.Name}</strong></mj-text>`
            : ''
        }
        ${
          showPosition
            ? `<mj-text mj-class="mj-team-position">${member.Position}</mj-text>`
            : ''
        }
      </mj-column>
    `
}

async function renderFullTeam () {
  const teamData = await fetchTeamData()
  let mjml = `<mj-section mj-class="mj-team-section" padding-left="70px" padding-right="70px">`

  for (const member of teamData) {
    mjml += await TeamMemberCard(member.Username, {
      showName: true,
      showPosition: true,
      imageSize: 100
    })
  }

  mjml += `</mj-section>`
  return mjml
}

export default function decorate () {
  return renderFullTeam()
}
