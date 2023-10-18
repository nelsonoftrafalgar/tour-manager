'use client'

import { AddNewTourManagerIcon, CreateWrapper, Wrapper } from './styles'

import ApiLoader from '@/components/ui/loader/ApiLoader'
import { Box } from '@/components/ui/box/styles'
import { TourManager } from '@/components/tourManager/TourManager'
import { TourManagerCreate } from '@/components/forms/tourManagerCreate/TourManagerCreate'
import { useState } from 'react'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'

const TourManagers = () => {
	const { data, isLoading } = useTourManagersQuery()
	const [isCreateMode, setCreateMode] = useState(false)

	const handleCreateMode = (toggle: boolean) => {
		setCreateMode(toggle)
	}
	return (
		<ApiLoader isLoading={isLoading}>
			<Box>
				<Wrapper>
					{data?.map(({ name, id }) => (
						<TourManager key={id} id={id} name={name} />
					))}
					{isCreateMode ? (
						<TourManagerCreate handleCreateMode={handleCreateMode} />
					) : (
						<CreateWrapper>
							<AddNewTourManagerIcon
								onClick={() => handleCreateMode(true)}
								width={30}
								height={30}
							/>
						</CreateWrapper>
					)}
				</Wrapper>
			</Box>
		</ApiLoader>
	)
}

export default TourManagers
