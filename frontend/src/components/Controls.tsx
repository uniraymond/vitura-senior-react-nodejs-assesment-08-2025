import { FormControlLabel, Switch, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import type { UserView } from '../types'

type Props = {
  q: string
  setQ: (v: string) => void
  view: UserView
  setView: (v: UserView) => void
  onlyNew: boolean
  setOnlyNew: (v: boolean) => void
}

const Controls = ({ q, setQ, view, setView, onlyNew, setOnlyNew }: Props) => {
    return (
        <div style={{ display: 'grid', gap: 12, alignItems: 'center', gridTemplateColumns: '1fr auto auto', marginBottom: 12 }}>
            <TextField
                id="search"
                label="Search by name"
                variant="outlined"
                value={q}
                onChange={e => setQ(e.target.value)}
                inputProps={{ 'aria-label': 'Search products by name' }}
            />
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_e, val) => val && setView(val)}
                aria-label="View role"
            >
                <ToggleButton value="doctor" aria-label="Doctor view">Doctor</ToggleButton>
                <ToggleButton value="admin" aria-label="Admin view">Admin</ToggleButton>
            </ToggleButtonGroup>
            <FormControlLabel
                control={<Switch checked={onlyNew} onChange={e => setOnlyNew(e.target.checked)} />}
                label="New (<=30 days)"
            />
        </div>
    );
}
export default Controls;
