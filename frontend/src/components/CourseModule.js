import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import { Course } from "./Course";
let courseMockData = [{
    name: "Defi 101 Starter Course",
    cover: "https://warehouse.kaik.network/cdn-cgi/image/width=660,quality=80/course/cover_photo/db62cfaa-8ee5-4518-a60b-70bbbca126f3/3376027c-7c32-41f4-9dca-4629e4931084.jpeg",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec nunc aliquet,
                egestas ex et, sagittis libero. Nunc sollicitudin sem dui, vel tincidunt arcu iaculis sed. `,
    status: "funding",
    totalFunding: 200,
    fund: 100,
    purchased: false
},
{
    name: "Web3 Engineer Starter",
    cover: "https://warehouse.kaik.network/cdn-cgi/image/width=660,quality=80/course/cover_photo/f711713d-fca1-4b2a-8d92-a8cbd6028e6b/345802fb-dcb6-4c28-bb42-e4d2e4df8101.jpg",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec nunc aliquet,
                egestas ex et, sagittis libero. Nunc sollicitudin sem dui, vel tincidunt arcu iaculis sed. `,
    status: "complete",
    purchased: true
}, {
    name: "Defi 101 Starter Course",
    cover: "https://warehouse.kaik.network/cdn-cgi/image/width=660,quality=80/course/cover_photo/f3701b92-5cdd-455e-9eae-deb5cd362225/03700cc6-3e2a-4317-b695-211421188e22.jpg",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec nunc aliquet,
                egestas ex et, sagittis libero. Nunc sollicitudin sem dui, vel tincidunt arcu iaculis sed. `,
    status: "funding",
    totalFunding: 200,
    fund: 100,
    purchased: false
}
]
export const CourseList = () =>
    <Container maxW='container.xl' p="5" minH="100vh" >
        <Text fontSize="5xl" mb={ 5 } color="white">Course List</Text>
        <SimpleGrid w="100%" columns={ 3 } spacing={ 5 }>

            { courseMockData.map(course => <Course course={ course }></Course>) }
        </SimpleGrid>
    </Container>