<template>
  <div class="job-wrapper">
    <div class="job-content">
      <RouterLink
        :to="`/company/profile/${companyName}`"
        class="back-link"
      >
        <i
          class="iconify"
          aria-hidden="true"
          data-icon="ph:arrow-left-duotone"
        />
        <span>Back to jobs</span>
      </RouterLink>

      <div class="job-header">
        <div class="left">
          <div class="job-icon">
            <img
              :src="company?.logo || '/img/company/default.svg'"
              :alt="company?.name"
            >
          </div>
          <div class="meta">
            <div class="company-name">
              <i
                class="iconify"
                data-icon="ph:buildings-duotone"
              />
              {{ company?.name }}
            </div>
            <h3 class="job-title">
              {{ job.title }}
            </h3>
            <div class="job-meta">
              <div class="meta-item location">
                <i
                  class="iconify"
                  data-icon="ph:map-pin-duotone"
                />
                {{ job.location?.city }}, {{ job.location?.state }}
                <template v-if="job.is_remote">
                  <span class="remote-badge">
                    <i
                      class="iconify"
                      data-icon="ph:house-duotone"
                    /> Remote
                  </span>
                </template>
              </div>
              <div
                v-if="job.compensation"
                class="meta-item salary"
              >
                <i
                  class="iconify"
                  data-icon="ph:money-duotone"
                />
                {{ formatSalary(job.compensation) }}
              </div>
              <div class="meta-item posted">
                <i
                  class="iconify"
                  data-icon="ph:calendar-duotone"
                />
                Posted {{ formatDate(job.date_posted) }}
              </div>
              <div class="meta-item reports">
                <i
                  class="iconify"
                  data-icon="ph:flag-duotone"
                />
                <span class="reports-count">0</span> Reports
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <a
            :href="job.job_url"
            target="_blank"
            rel="noopener noreferrer"
            class="button is-primary is-outlined is-raised"
          >
            Apply Now
          </a>
        </div>
      </div>

      <!-- Ethics Analysis Section -->
      <div class="ethics-analysis">
        <div class="ethics-header">
          <div
            class="status-badge"
            :class="{ 'is-ghost': job.augmented?.ethics?.is_ghost_job }"
          >
            <i
              class="iconify"
              :data-icon="job.augmented?.ethics?.is_ghost_job ? 'ph:warning-duotone' : 'ph:check-circle-duotone'"
            />
            {{ job.augmented?.ethics?.is_ghost_job ? 'Ghost Job Warning' : 'Legitimate Job' }}
          </div>
          <p class="status-reason">
            {{ job.augmented?.ethics?.reason }}
          </p>
        </div>

        <DoubleFaqCollapse
          :left="[
            {
              title: `Title Match ${job.augmented?.ethics?.coherence_analysis?.title_vs_description?.is_coherent ? '✓' : '✗'}`,
              content: job.augmented?.ethics?.coherence_analysis?.title_vs_description?.proof,
            },
            ...Object.entries(job.augmented?.ethics?.coherence_analysis?.content_coherence || {})
              .filter((_, index) => index % 2 === 0)
              .map(([key, metric]) => ({
                title: `${formatMetricName(key)} [${metric.score}]`,
                content: metric.proof,
              }))
          ]"
          :right="[
            ...Object.entries(job.augmented?.ethics?.coherence_analysis?.content_coherence || {})
              .filter((_, index) => index % 2 === 1)
              .map(([key, metric]) => ({
                title: `${formatMetricName(key)} [${metric.score}]`,
                content: metric.proof,
              })),
            {
              title: `Overall Assessment [${job.augmented?.ethics?.coherence_analysis?.overall_coherence?.score}]`,
              content: job.augmented?.ethics?.coherence_analysis?.overall_coherence?.proof,
            }
          ]"
          chevrons
        />
      </div>

      <div class="job-details-row">
        <div class="detail-item">
          <i
            class="iconify"
            data-icon="ph:buildings-duotone"
          />
          <div class="detail-content">
            <span class="label">Company</span>
            <span class="value">{{ company?.name }}</span>
          </div>
        </div>

        <div
          v-if="job.compensation"
          class="detail-item"
        >
          <i
            class="iconify"
            data-icon="ph:money-duotone"
          />
          <div class="detail-content">
            <span class="label">Salary Range</span>
            <span class="value">{{ formatSalary(job.compensation) }}</span>
          </div>
        </div>

        <div class="detail-item">
          <i
            class="iconify"
            data-icon="ph:calendar-duotone"
          />
          <div class="detail-content">
            <span class="label">Posted</span>
            <span class="value">{{ formatDate(job.date_posted) }}</span>
          </div>
        </div>

        <div class="detail-item">
          <i
            class="iconify"
            data-icon="ph:map-pin-duotone"
          />
          <div class="detail-content">
            <span class="label">Location</span>
            <span class="value">
              {{ job.location?.city }}, {{ job.location?.state }}
              <template v-if="job.is_remote">
                (Remote Available)
              </template>
            </span>
          </div>
        </div>
      </div>

      <div class="job-body">
        <div class="columns">
          <div class="column is-8">
            <div class="content-card">
              <!-- Augmented Job Information (Cisco only) -->
              <div
                v-if="job.augmented"
                class="augmented-info-section"
              >
                <!-- Job Overview Section -->
                <div class="augmented-block overview-section">
                  <div class="section-header">
                    <h3>
                      <i
                        class="iconify"
                        data-icon="ph:info-duotone"
                      />
                      Job Overview
                    </h3>
                  </div>

                  <div class="overview-grid">
                    <!-- Key Details Card -->
                    <div class="overview-card primary">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="primary"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:briefcase-duotone"
                          />
                        </IconBox>
                        <h4>Key Details</h4>
                      </div>
                      <div class="card-content">
                        <div class="info-grid">
                          <div class="info-item">
                            <span class="label">Employment</span>
                            <span class="value">{{ job.augmented.employment_type }}</span>
                          </div>
                          <div class="info-item">
                            <span class="label">Posted</span>
                            <span class="value">{{ job.augmented.job_posting_age }}</span>
                          </div>
                          <div class="info-item">
                            <span class="label">Deadline</span>
                            <span class="value">{{ job.augmented.application_deadline }}</span>
                          </div>
                          <div class="info-item">
                            <span class="label">Priority</span>
                            <span
                              class="value highlight"
                              :class="getPriorityClass(job.augmented.recruitment_priority)"
                            >
                              {{ job.augmented.recruitment_priority }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Work Environment Card -->
                    <div class="overview-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="info"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:buildings-duotone"
                          />
                        </IconBox>
                        <h4>Work Environment</h4>
                      </div>
                      <div class="card-content">
                        <div class="environment-details">
                          <div class="environment-description">
                            <p>{{ job.augmented.work_environment }}</p>
                          </div>
                          <div class="environment-stats">
                            <div class="stat-item">
                              <i
                                class="iconify"
                                data-icon="ph:clock-duotone"
                              />
                              <div class="content">
                                <span class="label">Schedule</span>
                                <span class="value">{{ job.augmented.scheduling_details }}</span>
                              </div>
                            </div>
                            <div class="stat-item">
                              <i
                                class="iconify"
                                data-icon="ph:house-duotone"
                              />
                              <div class="content">
                                <span class="label">Remote Work</span>
                                <span
                                  class="value"
                                  :class="getRemoteStatusClass(job.augmented.remote_option)"
                                >
                                  {{ job.augmented.remote_option }}
                                </span>
                              </div>
                            </div>
                            <div class="stat-item">
                              <i
                                class="iconify"
                                data-icon="ph:scales-duotone"
                              />
                              <div class="content">
                                <span class="label">Work-Life Balance</span>
                                <span class="value">{{ job.augmented.work_life_balance }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Career Growth Card -->
                    <div class="overview-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="success"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:trend-up-duotone"
                          />
                        </IconBox>
                        <h4>Career Growth</h4>
                      </div>
                      <div class="card-content">
                        <div class="career-path">
                          <div class="path-stage current">
                            <div class="stage-marker">
                              <i
                                class="iconify"
                                data-icon="ph:star-duotone"
                              />
                            </div>
                            <div class="stage-content">
                              <h5>Current Role</h5>
                              <p>{{ job.augmented.experience_level }}</p>
                            </div>
                          </div>
                          <div class="path-stage future">
                            <div class="stage-marker">
                              <i
                                class="iconify"
                                data-icon="ph:arrow-up-right-duotone"
                              />
                            </div>
                            <div class="stage-content">
                              <h5>Growth Opportunity</h5>
                              <p>{{ job.augmented.potential_career_path }}</p>
                            </div>
                          </div>
                          <div class="growth-metrics">
                            <div class="metric-item">
                              <i
                                class="iconify"
                                data-icon="ph:chart-line-up-duotone"
                              />
                              <div class="content">
                                <span class="label">Job Demand</span>
                                <span class="value">{{ job.augmented.job_demand }}</span>
                              </div>
                            </div>
                            <div class="metric-item">
                              <i
                                class="iconify"
                                data-icon="ph:target-duotone"
                              />
                              <div class="content">
                                <span class="label">Performance Metrics</span>
                                <span class="value">{{ job.augmented.performance_metrics }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Company Culture Card -->
                    <div class="overview-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="warning"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:users-duotone"
                          />
                        </IconBox>
                        <h4>Company Culture</h4>
                      </div>
                      <div class="card-content">
                        <div class="culture-insights">
                          <div class="culture-description">
                            <p>{{ job.augmented.company_culture }}</p>
                          </div>
                          <div class="culture-highlights">
                            <div class="highlight-item">
                              <i
                                class="iconify"
                                data-icon="ph:handshake-duotone"
                              />
                              <div class="content">
                                <span class="label">Diversity</span>
                                <span class="value">{{ job.augmented.diversity_stats }}</span>
                              </div>
                            </div>
                            <div class="highlight-item">
                              <i
                                class="iconify"
                                data-icon="ph:trophy-duotone"
                              />
                              <div class="content">
                                <span class="label">Reputation</span>
                                <span class="value">{{ job.augmented.company_reputation }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Skills & Qualifications Section -->
                <div class="augmented-block skills-section">
                  <h3>
                    <i
                      class="iconify"
                      data-icon="ph:code-duotone"
                    />
                    Skills & Qualifications
                  </h3>

                  <div class="qualifications-grid">
                    <!-- Left Column: Skills -->
                    <div class="skills-column">
                      <!-- Required Skills -->
                      <div class="skills-group">
                        <div class="skills-header">
                          <IconBox
                            size="small"
                            color="primary"
                            rounded
                          >
                            <i
                              class="iconify"
                              data-icon="ph:star-duotone"
                            />
                          </IconBox>
                          <h4>Required Skills</h4>
                        </div>
                        <div class="skills-list">
                          <Tag
                            v-for="skill in job.augmented.required_skills"
                            :key="skill"
                            :label="skill"
                            color="primary"
                            shape="rounded"
                            elevated
                          />
                        </div>
                      </div>

                      <!-- Desired Skills -->
                      <div
                        v-if="job.augmented.desired_skills?.length"
                        class="skills-group"
                      >
                        <div class="skills-header">
                          <IconBox
                            size="small"
                            color="info"
                            rounded
                          >
                            <i
                              class="iconify"
                              data-icon="ph:plus-circle-duotone"
                            />
                          </IconBox>
                          <h4>Desired Skills</h4>
                        </div>
                        <div class="skills-list">
                          <Tag
                            v-for="skill in job.augmented.desired_skills"
                            :key="skill"
                            :label="skill"
                            color="info"
                            shape="rounded"
                            elevated
                          />
                        </div>
                      </div>

                      <!-- Tools & Technologies -->
                      <div
                        v-if="job.augmented.work_tools?.length"
                        class="skills-group"
                      >
                        <div class="skills-header">
                          <IconBox
                            size="small"
                            color="success"
                            rounded
                          >
                            <i
                              class="iconify"
                              data-icon="ph:wrench-duotone"
                            />
                          </IconBox>
                          <h4>Tools & Technologies</h4>
                        </div>
                        <div class="skills-list">
                          <Tag
                            v-for="tool in job.augmented.work_tools"
                            :key="tool"
                            :label="tool"
                            color="success"
                            shape="rounded"
                            elevated
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Right Column: Requirements -->
                    <div class="requirements-column">
                      <div class="requirements-list">
                        <!-- Education -->
                        <div
                          v-if="job.augmented.education_requirement"
                          class="requirement-item"
                        >
                          <IconBox
                            size="small"
                            color="warning"
                            rounded
                          >
                            <i
                              class="iconify"
                              data-icon="ph:student-duotone"
                            />
                          </IconBox>
                          <div class="requirement-content">
                            <h4>Education</h4>
                            <p>{{ job.augmented.education_requirement }}</p>
                          </div>
                        </div>

                        <!-- Experience Level -->
                        <div
                          v-if="job.augmented.experience_level"
                          class="requirement-item"
                        >
                          <IconBox
                            size="small"
                            color="info"
                            rounded
                          >
                            <i
                              class="iconify"
                              data-icon="ph:briefcase-duotone"
                            />
                          </IconBox>
                          <div class="requirement-content">
                            <h4>Experience Level</h4>
                            <p>{{ job.augmented.experience_level }}</p>
                          </div>
                        </div>

                        <!-- Additional Requirements -->
                        <div
                          v-if="job.augmented.additional_requirements"
                          class="requirement-item"
                        >
                          <IconBox
                            size="small"
                            color="primary"
                            rounded
                          >
                            <i
                              class="iconify"
                              data-icon="ph:list-checks-duotone"
                            />
                          </IconBox>
                          <div class="requirement-content">
                            <h4>Additional Requirements</h4>
                            <p>{{ job.augmented.additional_requirements }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Company Insights & Growth Section -->
                <div class="augmented-block insights-section">
                  <div class="section-header">
                    <h3>
                      <i
                        class="iconify"
                        data-icon="ph:trending-up-duotone"
                      />
                      Company Insights & Growth
                    </h3>
                  </div>

                  <div class="insights-grid">
                    <!-- Industry Trends Card -->
                    <div class="insight-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="primary"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:chart-line-up-duotone"
                          />
                        </IconBox>
                        <h4>Industry Trends</h4>
                      </div>
                      <div class="card-content">
                        <div class="trend-analysis">
                          <div class="trend-description">
                            <p>{{ job.augmented.industry_trend }}</p>
                          </div>
                          <div class="trend-indicators">
                            <div class="indicator-item">
                              <i
                                class="iconify"
                                data-icon="ph:chart-bar-duotone"
                              />
                              <div class="content">
                                <span class="label">Job Demand</span>
                                <span
                                  class="value"
                                  :class="getDemandClass(job.augmented.job_demand)"
                                >
                                  {{ job.augmented.job_demand }}
                                </span>
                              </div>
                            </div>
                            <div class="indicator-item">
                              <i
                                class="iconify"
                                data-icon="ph:robot-duotone"
                              />
                              <div class="content">
                                <span class="label">Future Technology</span>
                                <span class="value">{{ job.augmented.future_technology_integration }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Work Culture Card -->
                    <div class="insight-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="info"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:users-three-duotone"
                          />
                        </IconBox>
                        <h4>Work Culture</h4>
                      </div>
                      <div class="card-content">
                        <div class="culture-analysis">
                          <div class="culture-highlights">
                            <div class="highlight-box">
                              <i
                                class="iconify"
                                data-icon="ph:heart-duotone"
                              />
                              <p>{{ job.augmented.company_culture }}</p>
                            </div>
                          </div>
                          <div class="culture-metrics">
                            <div class="metric-item">
                              <i
                                class="iconify"
                                data-icon="ph:scales-duotone"
                              />
                              <div class="content">
                                <span class="label">Work-Life Balance</span>
                                <span class="value">{{ job.augmented.work_life_balance }}</span>
                              </div>
                            </div>
                            <div class="metric-item">
                              <i
                                class="iconify"
                                data-icon="ph:users-duotone"
                              />
                              <div class="content">
                                <span class="label">Diversity & Inclusion</span>
                                <span class="value">{{ job.augmented.diversity_stats }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Career Development Card -->
                    <div class="insight-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="success"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:graduation-cap-duotone"
                          />
                        </IconBox>
                        <h4>Career Development</h4>
                      </div>
                      <div class="card-content">
                        <div class="development-paths">
                          <div class="training-info">
                            <div class="info-header">
                              <i
                                class="iconify"
                                data-icon="ph:book-duotone"
                              />
                              <h5>Training & Development</h5>
                            </div>
                            <p>{{ job.augmented.training_provided }}</p>
                          </div>
                          <div class="career-progression">
                            <div class="progression-header">
                              <i
                                class="iconify"
                                data-icon="ph:ladder-duotone"
                              />
                              <h5>Career Path</h5>
                            </div>
                            <div class="progression-steps">
                              <div class="step current">
                                <span class="step-marker">Current</span>
                                <p>{{ job.augmented.experience_level }}</p>
                              </div>
                              <div class="step-arrow">
                                <i
                                  class="iconify"
                                  data-icon="ph:arrow-right-duotone"
                                />
                              </div>
                              <div class="step future">
                                <span class="step-marker">Future</span>
                                <p>{{ job.augmented.potential_career_path }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Company Performance Card -->
                    <div class="insight-card">
                      <div class="card-header">
                        <IconBox
                          size="small"
                          color="warning"
                          rounded
                        >
                          <i
                            class="iconify"
                            data-icon="ph:trophy-duotone"
                          />
                        </IconBox>
                        <h4>Company Performance</h4>
                      </div>
                      <div class="card-content">
                        <div class="performance-metrics">
                          <div class="company-reputation">
                            <div class="reputation-header">
                              <i
                                class="iconify"
                                data-icon="ph:star-duotone"
                              />
                              <h5>Company Reputation</h5>
                            </div>
                            <p>{{ job.augmented.company_reputation }}</p>
                          </div>
                          <div class="key-metrics">
                            <div class="metric-item">
                              <i
                                class="iconify"
                                data-icon="ph:target-duotone"
                              />
                              <div class="content">
                                <span class="label">Performance Metrics</span>
                                <span class="value">{{ job.augmented.performance_metrics }}</span>
                              </div>
                            </div>
                            <div class="metric-item">
                              <i
                                class="iconify"
                                data-icon="ph:chart-pie-duotone"
                              />
                              <div class="content">
                                <span class="label">Job Stability</span>
                                <span class="value">{{ job.augmented.job_stability }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Job Description -->
              <div class="description-section">
                <h3>
                  <i
                    class="iconify"
                    data-icon="ph:text-align-left-duotone"
                  />
                  Full Job Description
                </h3>
                <div
                  class="content"
                  :class="{ 'is-truncated': !showFullDescription }"
                  v-html="formattedDescription"
                />
                <button
                  v-if="hasLongDescription"
                  class="button is-primary is-light is-small"
                  @click="showFullDescription = !showFullDescription"
                >
                  {{ showFullDescription ? 'Show Less' : 'View More' }}
                </button>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <!-- Similar Jobs -->
            <div class="side-card similar-jobs-card">
              <h3>
                <i
                  class="iconify"
                  data-icon="ph:briefcase-duotone"
                />
                More Jobs at {{ company?.name }}
              </h3>
              <div class="similar-jobs-list">
                <div
                  v-if="isLoadingSimilarJobs"
                  class="loading-state"
                >
                  <p>Loading similar jobs...</p>
                </div>

                <div
                  v-else-if="similarJobsError"
                  class="error-state"
                >
                  <p>{{ similarJobsError }}</p>
                </div>

                <template v-else>
                  <div
                    v-for="similarJob in similarJobs"
                    :key="similarJob.id"
                    class="similar-job-item"
                  >
                    <div class="job-info">
                      <h4>{{ similarJob.title }}</h4>
                      <div class="job-meta">
                        <span class="location">
                          <i
                            class="iconify"
                            data-icon="ph:map-pin-duotone"
                          />
                          {{ similarJob.location?.city }}, {{ similarJob.location?.state }}
                        </span>
                        <span
                          v-if="similarJob.compensation"
                          class="salary"
                        >
                          <i
                            class="iconify"
                            data-icon="ph:money-duotone"
                          />
                          {{ formatSalary(similarJob.compensation) }}
                        </span>
                      </div>
                    </div>
                    <div class="job-action">
                      <a
                        :href="`/company/profile/job/${similarJob.id}?company=${encodeURIComponent(companyName)}`"
                        class="button"
                        title="View Job Details"
                      >
                        <i
                          class="iconify"
                          data-icon="ph:arrow-right-duotone"
                        />
                      </a>
                    </div>
                  </div>

                  <a
                    :href="`/company/profile/jobs?company=${encodeURIComponent(companyName)}`"
                    class="view-all-link"
                  >
                    View All Jobs
                    <i
                      class="iconify"
                      data-icon="ph:arrow-right-duotone"
                    />
                  </a>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany';
import type { TagColor } from '/@src/components/base/tag/Tag.vue';

const route = useRoute();
const selectedCompanyStore = useSelectedCompanyStore();
const company = computed(() => selectedCompanyStore.company);
const companyName = computed(() => route.query.company as string);

const showFullOverview = ref(false);
const showFullDescription = ref(false);
const isLoadingSimilarJobs = ref(true);
const similarJobsError = ref<string | null>(null);
const similarJobs = ref<any[]>([]);
const activeProof = ref<string | null>(null);

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

const formattedDescription = computed(() => {
  if (!props.job?.description) return '';
  return props.job.description.replace(/\n/g, '<br>');
});

const hasLongDescription = computed(() => {
  return formattedDescription.value.length > 500;
});

const formatJobType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatSalary = (compensation: any) => {
  if (!compensation) return 'Not specified';

  const min = compensation.min_amount;
  const max = compensation.max_amount;
  const interval = compensation.interval;

  const formatK = (amount: number) => {
    return amount >= 1000 ? `${Math.round(amount / 1000)}k` : amount;
  };

  if (min && max) {
    return `${formatK(min)}$ - ${formatK(max)}$ ${interval}`;
  } else if (min) {
    return `From ${formatK(min)}$ ${interval}`;
  } else if (max) {
    return `Up to ${formatK(max)}$ ${interval}`;
  }

  return 'Not specified';
};

const formatDate = (date: string) => {
  if (!date) return 'Not specified';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Function to format company name for file path
const formatCompanyNameForFile = (name: string): string => {
  // First normalize the name
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();

  // Map special cases to their correct file names
  const nameMap: { [key: string]: string } = {
    'bank_of_america': 'Bank_of_America',
    'capital_one': 'Capital_One',
    'cisco': 'Cisco',
    'family_dollar': 'Family_Dollar',
    'intermountain_health': 'Intermountain_Health',
    'lululemon': 'lululemon',
    'microsoft': 'Microsoft',
    'nbcuniversal': 'NBCUniversal',
    'nike': 'Nike',
    'skechers': 'Skechers',
    'trinity_health': 'Trinity_Health',
    'verizon': 'Verizon'
  };

  return nameMap[normalized] || normalized;
};

// Load similar jobs from sample file
const loadSimilarJobs = async () => {
  if (!companyName.value) return;

  try {
    isLoadingSimilarJobs.value = true;
    const formattedName = formatCompanyNameForFile(companyName.value);
    const response = await fetch(`/src/prototype-data-v1 copy/samples copy/${formattedName}_sample.json`);

    if (!response.ok) {
      throw new Error(`Jobs data not found for ${formattedName}`);
    }

    const data = await response.json();
    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error('Invalid jobs data format');
    }

    // Filter out current job and limit to 3 jobs
    similarJobs.value = data.jobs
      .filter(j => j.id !== props.job.id)
      .slice(0, 3);

  } catch (err) {
    console.error('Error loading similar jobs:', err);
    similarJobsError.value = err instanceof Error ? err.message : 'Failed to load similar jobs';
  } finally {
    isLoadingSimilarJobs.value = false;
  }
};

// Call loadSimilarJobs when component mounts
onMounted(() => {
  loadSimilarJobs();
});

const getBenefitColor = (index: number): TagColor => {
  const colors: TagColor[] = ['primary', 'info', 'success', 'warning'];
  return colors[index % colors.length];
};

function getPriorityClass(priority: string) {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-success';
    case 'medium':
      return 'text-warning';
    case 'low':
      return 'text-danger';
    default:
      return '';
  }
}

function getRemoteStatusClass(status: string) {
  return status?.toLowerCase().includes('not') ? 'remote-not-available' : 'remote-available';
}

function getDemandClass(demand: string) {
  switch (demand?.toLowerCase()) {
    case 'high':
      return 'high-demand';
    case 'moderate':
      return 'moderate-demand';
    case 'low':
      return 'low-demand';
    default:
      return '';
  }
}

const getMetricIcon = (metric: string) => {
  const icons: Record<string, string> = {
    transparency: 'ph:eye-duotone',
    accuracy: 'ph:target-duotone',
    completeness: 'ph:check-square-duotone',
    fairness: 'ph:scales-duotone',
    inclusivity: 'ph:users-three-duotone'
  };
  return icons[metric] || 'ph:info-duotone';
};

const formatMetricName = (metric: string) => {
  return metric.charAt(0).toUpperCase() + metric.slice(1);
};

const getScoreClass = (score: string) => {
  const scoreMap: Record<string, string> = {
    'High': 'is-high',
    'Complete': 'is-high',
    'Neutral': 'is-neutral',
    'Inclusive': 'is-high',
    'Low': 'is-low'
  };
  return scoreMap[score] || 'is-neutral';
};

const showProof = (key: string, data: any) => {
  activeProof.value = activeProof.value === key ? null : key;
};
</script>

<style lang="scss" scoped>
.job-wrapper {
  padding-top: 60px; // Reduced space for navbar
  padding-bottom: 3rem;
  min-height: 100vh;
  background: var(--wrap-bg-color, #f5f5f5);
}

.job-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;

  .back-link {
    display: inline-flex;
    align-items: center;
    color: var(--primary);
    margin-bottom: 1.5rem;
    font-family: var(--font);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    font-size: 0.95rem;

    &:hover {
      background: var(--white);
      .iconify {
        transform: translateX(-4px);
      }
    }

    .iconify {
      margin-right: 0.5rem;
      transition: transform 0.3s ease;
    }
  }

  .job-header {
    background: var(--white);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    box-shadow: var(--light-box-shadow);
    border: 1px solid var(--wrap-border-color, #e0e0e0);

    .left {
      display: flex;
      align-items: center;
      flex: 1;

      .job-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 70px;
        background: var(--wrap-bg-color, #f5f5f5);
        border: 1px solid var(--wrap-border-color, #e0e0e0);
        border-radius: 12px;
        padding: 0.75rem;
        box-shadow: var(--light-box-shadow);

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .meta {
        margin-left: 1.25rem;
        line-height: 1.3;

        .company-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: var(--primary);
          margin-bottom: 0.5rem;

          .iconify {
            font-size: 1.2em;
          }
        }

        .job-title {
          font-family: var(--font-alt);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--title-color);
          margin-bottom: 0.75rem;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;

          .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            color: var(--light-text);

            .iconify {
              color: var(--primary);
              font-size: 1.1rem;
            }

            &.salary {
              color: var(--success);
              font-weight: 500;
            }

            &.reports {
              .reports-count {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 20px;
                height: 20px;
                padding: 0 6px;
                background: var(--wrap-bg-color);
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 500;
                color: var(--medium-text);
              }
            }
          }

          .remote-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.5rem;
            background: var(--success-light);
            border-radius: 1rem;
            font-size: 0.85rem;
            color: var(--success);
            font-weight: 500;
            margin-left: 0.5rem;

            .iconify {
              color: var(--success);
            }
          }
        }
      }
    }

    .right {
      .button {
        height: 42px;
        min-width: 130px;
        font-weight: 500;
      }
    }
  }

  .job-details-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
    background: var(--white);
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: var(--light-box-shadow);
    border: 1px solid var(--wrap-border-color, #e0e0e0);

    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 8px;
      background: var(--wrap-bg-color, #f5f5f5);
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-light);

        .iconify {
          color: var(--primary);
          transform: scale(1.1);
        }
      }

      .iconify {
        font-size: 1.25rem;
        color: var(--light-text);
        transition: all 0.3s ease;
      }

      .detail-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .label {
          font-size: 0.85rem;
          color: var(--light-text);
        }

        .value {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--title-color);
        }
      }
    }
  }

  .job-body {
    .content-card,
    .side-card {
      background: var(--white);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
      box-shadow: var(--light-box-shadow);
      border: 1px solid var(--wrap-border-color, #e0e0e0);

      h3 {
        font-family: var(--font-alt);
        font-size: 1.15rem;
        font-weight: 600;
        color: var(--title-color, #283252);
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .iconify {
          color: var(--primary);
          font-size: 1.2rem;
        }
      }
    }

    .augmented-info-section {
      margin-top: 2rem;
      padding-top: 2rem;

      .augmented-block {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--wrap-bg-color, #f5f5f5);
        border-radius: 12px;
        border: 1px solid var(--wrap-border-color, #e0e0e0);

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-alt);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--title-color, #283252);
          margin-bottom: 1.5rem;

          .iconify {
            color: var(--primary);
            font-size: 1.3rem;
          }
        }

        &.skills-section {
          .qualifications-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 0.5rem;

            @media (max-width: 767px) {
              grid-template-columns: 1fr;
            }
          }

          .skills-column {
            .skills-group {
              background: var(--white);
              border-radius: 8px;
              padding: 1rem;
              margin-bottom: 1rem;
              border: 1px solid var(--wrap-border-color, #e0e0e0);
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-2px);
              }

              .skills-header {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1rem;

                h4 {
                  font-family: var(--font-alt);
                  font-size: 1rem;
                  font-weight: 600;
                  color: var(--title-color, #283252);
                  margin: 0;
                }
              }

              .skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
              }
            }
          }

          .requirements-column {
            .requirements-list {
              display: flex;
              flex-direction: column;
              gap: 1rem;

              .requirement-item {
                background: var(--white);
                border-radius: 8px;
                padding: 1rem;
                border: 1px solid var(--wrap-border-color, #e0e0e0);
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                transition: all 0.3s ease;

                &:hover {
                  transform: translateY(-2px);
                }

                .requirement-content {
                  flex: 1;

                  h4 {
                    font-family: var(--font-alt);
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--title-color, #283252);
                    margin-bottom: 0.5rem;
                  }

                  p {
                    font-size: 0.95rem;
                    color: var(--medium-text, #4a4a4a);
                    line-height: 1.4;
                  }
                }
              }
            }
          }
        }

        &.insights-section {
          .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }
        }
      }
    }

    .description-section {
      margin-top: 2rem;
      border-top: 1px solid var(--wrap-border-color, #e0e0e0);
      padding-top: 2rem;

      h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-alt);
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--title-color, #283252);
        margin-bottom: 1.25rem;

        .iconify {
          color: var(--primary);
          font-size: 1.3rem;
        }
      }

      .content {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--medium-text, #4a4a4a);
        background: var(--wrap-bg-color, #f5f5f5);
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid var(--wrap-border-color, #e0e0e0);

        &.is-truncated {
          max-height: 300px;
          overflow: hidden;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--white));
          }
        }
      }

      button {
        margin-top: 1rem;
        font-weight: 500;
      }
    }

    .similar-jobs-card {
      .similar-jobs-list {
        .similar-job-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1rem;
          background: var(--wrap-bg-color, #f5f5f5);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;

          &:not(:last-child) {
            border-bottom: 1px solid var(--wrap-border-color, #e0e0e0);
            margin-bottom: 0.75rem;
            padding-bottom: 0.75rem;
          }

          &:hover {
            background: var(--white);
            border-color: var(--primary);
            transform: translateX(4px);

            .job-action {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .job-info {
            flex: 1;
            margin-right: 1rem;
            min-width: 0;

            h4 {
              font-family: var(--font);
              font-size: 0.95rem;
              font-weight: 500;
              color: var(--title-color, #283252);
              margin-bottom: 0.5rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .job-meta {
              display: flex;
              gap: 1rem;
              font-size: 0.85rem;
              color: var(--light-text, #a2a5b9);
              flex-wrap: wrap;

              span {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;

                .iconify {
                  color: var(--primary);
                  font-size: 1rem;
                }

                &.salary {
                  font-weight: 500;
                  color: var(--title-color);
                }
              }
            }
          }

          .job-action {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translate(10px, -50%);
            opacity: 0;
            transition: all 0.3s ease;

            .button {
              width: 36px;
              height: 36px;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
              background: var(--primary-light);
              border: none;
              color: var(--primary);

              .iconify {
                font-size: 1.2rem;
                transition: transform 0.3s ease;
              }

              &:hover {
                background: var(--primary);
                color: white;

                .iconify {
                  transform: translateX(2px);
                }
              }
            }
          }
        }
      }

      .view-all-link {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        margin-top: 0.75rem;
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--primary);
        transition: all 0.3s ease;
        border-radius: 6px;

        .iconify {
          font-size: 1.1em;
          transition: transform 0.3s ease;
        }

        &:hover {
          background: var(--primary-light);
          color: var(--primary-dark);

          .iconify {
            transform: translateX(4px);
          }
        }
      }
    }
  }
}

.loading-state,
.error-state {
  padding: 1.5rem 1rem;
  text-align: center;
  color: var(--light-text);
  font-size: 0.9rem;
  background: var(--wrap-bg-color, #f5f5f5);
  border-radius: 8px;
}

.error-state {
  color: var(--danger);
  background: var(--danger-light);
}

@media (max-width: 767px) {
  .job-content {
    padding: 1rem;

    .job-header {
      flex-direction: column;
      text-align: center;
      padding: 1.25rem;

      .left {
        flex-direction: column;
        margin-bottom: 1rem;

        .job-icon {
          margin: 0 auto 1rem;
        }

        .meta {
          margin-left: 0;

          .job-title {
            font-size: 1.25rem;
          }

          .job-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;

            .meta-item {
              width: 100%;
            }

            .remote-badge {
              margin-left: 0;
              margin-top: 0.25rem;
            }
          }
        }
      }
    }

    .job-details-row {
      grid-template-columns: 1fr;
      padding: 1rem;

      .detail-item {
        padding: 0.75rem;
      }
    }

    .job-body {
      .content-card,
      .side-card {
        padding: 1.25rem;
      }

      .similar-job-item {
        flex-direction: column;

        .job-info {
          margin-right: 0;
          margin-bottom: 1rem;
          width: 100%;

          .job-meta {
            justify-content: flex-start;
          }
        }

        .job-action {
          position: static;
          transform: none;
          opacity: 1;
          margin-top: 0.5rem;
        }
      }
    }
  }
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.overview-card {
  background: var(--white);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &.primary {
    border-color: var(--primary);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--card-bg-color-secondary);

    h4 {
      font-size: 0.95rem;
      font-weight: 600;
      margin: 0;
    }
  }

  .card-content {
    padding: 1rem;
  }
}

.environment-details {
  .environment-description {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);

    p {
      font-size: 0.9rem;
      color: var(--medium-text);
      line-height: 1.5;
    }
  }

  .environment-stats {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .stat-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;

      .iconify {
        font-size: 1.25rem;
        color: var(--primary);
      }

      .content {
        flex: 1;

        .label {
          display: block;
          font-size: 0.8rem;
          color: var(--light-text);
          margin-bottom: 0.25rem;
        }

        .value {
          font-size: 0.9rem;
          color: var(--title-color);

          &.remote-available {
            color: var(--success);
          }

          &.remote-not-available {
            color: var(--danger);
          }
        }
      }
    }
  }
}

.career-path {
  .path-stage {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: var(--card-bg-color-secondary);
    border-radius: 8px;
    margin-bottom: 0.75rem;

    .stage-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--primary-light);
      border-radius: 50%;

      .iconify {
        font-size: 1.25rem;
        color: var(--primary);
      }
    }

    .stage-content {
      flex: 1;

      h5 {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--title-color);
        margin: 0 0 0.25rem;
      }

      p {
        font-size: 0.85rem;
        color: var(--medium-text);
        margin: 0;
        line-height: 1.4;
      }
    }

    &.future {
      background: var(--success-light);

      .stage-marker {
        background: var(--success-lighter);

        .iconify {
          color: var(--success);
        }
      }
    }
  }

  .growth-metrics {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .metric-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--card-bg-color-secondary);
      border-radius: 8px;

      .iconify {
        font-size: 1.25rem;
        color: var(--primary);
      }

      .content {
        flex: 1;

        .label {
          display: block;
          font-size: 0.8rem;
          color: var(--light-text);
          margin-bottom: 0.25rem;
        }

        .value {
          font-size: 0.9rem;
          color: var(--title-color);
        }
      }
    }
  }
}

.culture-insights {
  .culture-description {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);

    p {
      font-size: 0.9rem;
      color: var(--medium-text);
      line-height: 1.5;
    }
  }

  .culture-highlights {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--card-bg-color-secondary);
      border-radius: 8px;

      .iconify {
        font-size: 1.25rem;
        color: var(--primary);
      }

      .content {
        flex: 1;

        .label {
          display: block;
          font-size: 0.8rem;
          color: var(--light-text);
          margin-bottom: 0.25rem;
        }

        .value {
          font-size: 0.9rem;
          color: var(--title-color);
        }
      }
    }
  }
}

.insights-section {
  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .insight-card {
    background: var(--white);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      background: var(--card-bg-color-secondary);

      h4 {
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0;
      }
    }

    .card-content {
      padding: 1rem;
    }
  }

  .trend-analysis {
    .trend-description {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);

      p {
        font-size: 0.9rem;
        color: var(--medium-text);
        line-height: 1.5;
      }
    }

    .trend-indicators {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .indicator-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--card-bg-color-secondary);
        border-radius: 8px;

        .iconify {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .content {
          flex: 1;

          .label {
            display: block;
            font-size: 0.8rem;
            color: var(--light-text);
            margin-bottom: 0.25rem;
          }

          .value {
            font-size: 0.9rem;
            color: var(--title-color);

            &.high-demand {
              color: var(--success);
            }

            &.moderate-demand {
              color: var(--warning);
            }

            &.low-demand {
              color: var(--danger);
            }
          }
        }
      }
    }
  }

  .culture-analysis {
    .culture-highlights {
      margin-bottom: 1rem;

      .highlight-box {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: var(--primary-light);
        border-radius: 8px;

        .iconify {
          font-size: 1.5rem;
          color: var(--primary);
        }

        p {
          font-size: 0.9rem;
          color: var(--title-color);
          margin: 0;
          line-height: 1.5;
        }
      }
    }

    .culture-metrics {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .metric-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--card-bg-color-secondary);
        border-radius: 8px;

        .iconify {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .content {
          flex: 1;

          .label {
            display: block;
            font-size: 0.8rem;
            color: var(--light-text);
            margin-bottom: 0.25rem;
          }

          .value {
            font-size: 0.9rem;
            color: var(--title-color);
          }
        }
      }
    }
  }

  .development-paths {
    .training-info, .career-progression {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .info-header, .progression-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .iconify {
          font-size: 1.25rem;
          color: var(--primary);
        }

        h5 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--title-color);
          margin: 0;
        }
      }

      p {
        font-size: 0.9rem;
        color: var(--medium-text);
        line-height: 1.5;
        margin: 0;
      }
    }

    .progression-steps {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.75rem;

      .step {
        flex: 1;
        background: var(--card-bg-color-secondary);
        padding: 0.75rem;
        border-radius: 8px;
        text-align: center;

        &.future {
          background: var(--success-light);

          .step-marker {
            background: var(--success);
          }
        }

        .step-marker {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--primary);
          color: white;
          border-radius: 1rem;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.85rem;
          color: var(--medium-text);
          margin: 0;
          line-height: 1.4;
        }
      }

      .step-arrow {
        .iconify {
          font-size: 1.5rem;
          color: var(--light-text);
        }
      }
    }
  }

  .performance-metrics {
    .company-reputation {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);

      .reputation-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .iconify {
          font-size: 1.25rem;
          color: var(--primary);
        }

        h5 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--title-color);
          margin: 0;
        }
      }

      p {
        font-size: 0.9rem;
        color: var(--medium-text);
        line-height: 1.5;
        margin: 0;
      }
    }

    .key-metrics {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .metric-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--card-bg-color-secondary);
        border-radius: 8px;

        .iconify {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .content {
          flex: 1;

          .label {
            display: block;
            font-size: 0.8rem;
            color: var(--light-text);
            margin-bottom: 0.25rem;
          }

          .value {
            font-size: 0.9rem;
            color: var(--title-color);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .insights-section {
    .insights-grid {
      grid-template-columns: 1fr;
    }

    .development-paths {
      .progression-steps {
        flex-direction: column;
        gap: 0.5rem;

        .step {
          width: 100%;
        }

        .step-arrow {
          transform: rotate(90deg);
        }
      }
    }
  }
}

.ethics-analysis {
  background: var(--white);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--wrap-border-color);

  .ethics-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    margin: -1rem -1rem 1rem;
    background: var(--card-bg-color-secondary);
    border-bottom: 1px solid var(--wrap-border-color);

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.85rem;
      font-weight: 500;
      background: var(--success-light);
      color: var(--success);
      white-space: nowrap;
      flex-shrink: 0;

      &.is-ghost {
        background: var(--warning-light);
        color: var(--warning);
      }

      .iconify {
        font-size: 1.1em;
      }
    }

    .status-reason {
      font-size: 0.9rem;
      color: var(--medium-text);
      margin: 0;
      line-height: 1.4;
    }
  }

  :deep(.faq-columns) {
    gap: 1.5rem;
    margin-top: 0;

    .faq-column {
      .collapse-wrap {
        .collapse {
          background: var(--card-bg-color-secondary);
          border-radius: 8px;
          border: 1px solid var(--wrap-border-color);
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-1px);
            border-color: var(--primary);
            box-shadow: var(--light-box-shadow);
          }

          .collapse-header {
            padding: 1rem;
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--title-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;

            &::after {
              content: '';
              width: 24px;
              height: 24px;
              min-width: 24px;
              border-radius: 6px;
              background: var(--white);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
            }

            &.is-active {
              &::after {
                background: var(--primary-light);
                transform: rotate(180deg);
              }
            }
          }

          .collapse-content {
            padding: 0 1rem 1rem;
            font-size: 0.9rem;
            color: var(--medium-text);
            line-height: 1.5;

            &:not(:first-child) {
              border-top: 1px solid var(--wrap-border-color);
              padding-top: 1rem;
            }
          }

          &.is-active {
            background: var(--white);
            border-color: var(--primary);
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .ethics-analysis {
    padding: 0.75rem;

    .ethics-header {
      margin: -0.75rem -0.75rem 0.75rem;
      padding: 0.75rem;

      .status-badge {
        font-size: 0.8rem;
        padding: 0.25rem 0.6rem;
      }

      .status-reason {
        font-size: 0.85rem;
      }
    }

    :deep(.faq-columns) {
      gap: 0.75rem;

      .faq-column {
        .collapse-wrap {
          .collapse {
            margin-bottom: 0.5rem;

            .collapse-header {
              padding: 0.75rem;
              font-size: 0.9rem;

              &::after {
                width: 20px;
                height: 20px;
                min-width: 20px;
              }
            }

            .collapse-content {
              padding: 0 0.75rem 0.75rem;
              font-size: 0.85rem;

              &:not(:first-child) {
                padding-top: 0.75rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

