'use client'

import { AddNewTourManagerIcon, CreateWrapper, Wrapper } from './styles'

import ApiLoader from '@/components/ui/loader/ApiLoader'
import { Box } from '@/components/ui/box/styles'
import TourManager from '@/components/tourManager/TourManager'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'

const TourManagers = () => {
	const { data, isLoading } = useTourManagersQuery()
	return (
		<ApiLoader isLoading={isLoading}>
			<Box>
				<Wrapper>
					{data?.map(({ name, id }) => (
						<TourManager key={id} name={name} />
					))}
					<CreateWrapper>
						<AddNewTourManagerIcon width={30} height={30} />
					</CreateWrapper>
				</Wrapper>
			</Box>
		</ApiLoader>
	)
}

export default TourManagers
