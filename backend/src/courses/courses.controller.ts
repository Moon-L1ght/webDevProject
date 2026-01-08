import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const course = {
    courseId: 'html-css-basics',
    title: 'HTML + CSS с нуля',
    latestVersion: '1.0.0',
    sizeBytes: 0,
    checksumSha256: 'TODO_SHA256',
};

@UseGuards(JwtAuthGuard)
@Controller()
export class CoursesController {
    @Get('courses')
    listCourses() {
        return { courses: [course] };
    }

    @Post('courses/:courseId/download')
    download(@Param('courseId') courseId: string) {
        if (courseId !== course.courseId)
            throw new NotFoundException('Course not found');

        return {
            url: `http://127.0.0.1:4000/static/courses/${course.courseId}/${course.latestVersion}/course-${course.latestVersion}.zip`,
            version: course.latestVersion,
            checksumSha256: course.checksumSha256,
            sizeBytes: course.sizeBytes,
        };
    }
}
