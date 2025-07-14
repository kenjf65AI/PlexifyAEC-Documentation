import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dashboardData from '../mocks/dashboardData';
import chatData from '../mocks/chatData';
import complianceData from '../mocks/complianceData';
import reportData from '../mocks/reportData';

// Create store with persistence to localStorage
const useStore = create(
  persist(
    (set, get) => ({
      // Initial state from mock data
      dashboard: dashboardData,
      chat: {
        conversations: chatData.conversations,
        currentConversationId: chatData.currentConversationId,
        agents: chatData.agents,
        isTyping: chatData.isTyping
      },
      compliance: complianceData,
      reports: reportData,

      // Chat actions
      addMessage: (conversationId, message) => {
        set((state) => {
          const conversations = state.chat.conversations.map((conversation) => {
            if (conversation.id === conversationId) {
              return {
                ...conversation,
                messages: [...conversation.messages, {
                  id: `msg-${Date.now()}`,
                  ...message
                }],
                updatedAt: new Date().toISOString()
              };
            }
            return conversation;
          });

          return {
            chat: {
              ...state.chat,
              conversations
            }
          };
        });
      },

      createNewConversation: (title = "New Conversation") => {
        set((state) => {
          const newConversation = {
            id: `conv-${Date.now()}`,
            title,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: []
          };

          return {
            chat: {
              ...state.chat,
              conversations: [newConversation, ...state.chat.conversations],
              currentConversationId: newConversation.id
            }
          };
        });
      },

      setCurrentConversation: (conversationId) => {
        set((state) => ({
          chat: {
            ...state.chat,
            currentConversationId: conversationId
          }
        }));
      },

      setTypingStatus: (isTyping) => {
        set((state) => ({
          chat: {
            ...state.chat,
            isTyping
          }
        }));
      },

      // Compliance actions
      updateComplianceStatus: (regulationId, updates) => {
        set((state) => {
          const detailedData = state.compliance.detailedData.map((item) => {
            if (item.id === regulationId) {
              return {
                ...item,
                ...updates
              };
            }
            return item;
          });

          // Recalculate overall score and status counts
          const statusCounts = {
            compliant: 0,
            warning: 0,
            "non-compliant": 0
          };

          let totalScore = 0;
          detailedData.forEach((item) => {
            statusCounts[item.status]++;
            totalScore += item.score;
          });

          const overallScore = Math.round(totalScore / detailedData.length);

          return {
            compliance: {
              ...state.compliance,
              detailedData,
              statusCounts,
              overallScore,
              lastUpdated: new Date().toISOString()
            }
          };
        });
      },

      addComplianceIssue: (regulationId, issue) => {
        set((state) => {
          const detailedData = state.compliance.detailedData.map((item) => {
            if (item.id === regulationId) {
              return {
                ...item,
                issues: [...item.issues, issue]
              };
            }
            return item;
          });

          return {
            compliance: {
              ...state.compliance,
              detailedData,
              lastUpdated: new Date().toISOString()
            }
          };
        });
      },

      resolveComplianceIssue: (regulationId, issueIndex) => {
        set((state) => {
          const detailedData = state.compliance.detailedData.map((item) => {
            if (item.id === regulationId) {
              const issues = [...item.issues];
              issues.splice(issueIndex, 1);
              
              return {
                ...item,
                issues
              };
            }
            return item;
          });

          return {
            compliance: {
              ...state.compliance,
              detailedData,
              lastUpdated: new Date().toISOString()
            }
          };
        });
      },

      // Report actions
      generateReport: (reportType, options = {}) => {
        set((state) => {
          const reportId = `gen-${reportType}-${Date.now()}`;
          const reportTemplate = state.reports.templates[reportType];
          const reportTypeInfo = state.reports.types.find(type => type.id === reportType);
          
          if (!reportTemplate || !reportTypeInfo) {
            console.error("Report type not found:", reportType);
            return state;
          }

          const reportName = options.title || `${reportTypeInfo.name} - ${new Date().toLocaleDateString()}`;
          
          const newGenerationStatus = {
            id: reportId,
            reportType,
            reportName,
            status: "in-progress",
            progress: 0,
            startTime: new Date().toISOString(),
            steps: [
              { name: "Data Collection", status: "pending" },
              { name: "Analysis", status: "pending" },
              { name: "Document Generation", status: "pending" },
              { name: "Evidence Linking", status: "pending" }
            ]
          };

          return {
            reports: {
              ...state.reports,
              generationStatus: [
                newGenerationStatus,
                ...state.reports.generationStatus
              ]
            }
          };
        });
      },

      simulateReportGeneration: (reportId) => {
        // This function simulates the progress of report generation
        const updateProgress = (progress, stepIndex, stepStatus, stepDuration = null) => {
          set((state) => {
            const generationStatus = state.reports.generationStatus.map((status) => {
              if (status.id === reportId) {
                const steps = [...status.steps];
                steps[stepIndex] = {
                  ...steps[stepIndex],
                  status: stepStatus,
                  ...(stepDuration && { duration: stepDuration })
                };

                return {
                  ...status,
                  progress,
                  steps
                };
              }
              return status;
            });

            return {
              reports: {
                ...state.reports,
                generationStatus
              }
            };
          });
        };

        // Step 1: Data Collection (0-25%)
        updateProgress(5, 0, "in-progress");
        setTimeout(() => {
          updateProgress(25, 0, "complete", "10 seconds");
          
          // Step 2: Analysis (25-50%)
          updateProgress(30, 1, "in-progress");
          setTimeout(() => {
            updateProgress(50, 1, "complete", "15 seconds");
            
            // Step 3: Document Generation (50-75%)
            updateProgress(55, 2, "in-progress");
            setTimeout(() => {
              updateProgress(75, 2, "complete", "12 seconds");
              
              // Step 4: Evidence Linking (75-100%)
              updateProgress(80, 3, "in-progress");
              setTimeout(() => {
                updateProgress(100, 3, "complete", "8 seconds");
                
                // Complete the report
                set((state) => {
                  const generationStatus = state.reports.generationStatus.map((status) => {
                    if (status.id === reportId) {
                      const reportType = status.reportType;
                      const reportName = status.reportName;
                      
                      // Create result with download links
                      return {
                        ...status,
                        status: "complete",
                        endTime: new Date().toISOString(),
                        result: {
                          downloadUrl: "#",
                          size: `${Math.floor(Math.random() * 5) + 2}.${Math.floor(Math.random() * 9)}MB`,
                          format: "pdf",
                          pages: Math.floor(Math.random() * 20) + 15
                        }
                      };
                    }
                    return status;
                  });

                  // Add to recent reports
                  const newReport = {
                    id: `report-${Date.now()}`,
                    name: generationStatus.find(s => s.id === reportId)?.reportName || "Generated Report",
                    type: generationStatus.find(s => s.id === reportId)?.reportType || "pm-report",
                    date: new Date().toISOString(),
                    size: `${Math.floor(Math.random() * 5) + 2}.${Math.floor(Math.random() * 9)} MB`,
                    format: "pdf",
                    pages: Math.floor(Math.random() * 20) + 15,
                    downloadUrl: "#",
                    jsonUrl: "#",
                    author: "PlexifyAEC AI",
                    description: `Generated report for ${generationStatus.find(s => s.id === reportId)?.reportName}.`
                  };

                  return {
                    reports: {
                      ...state.reports,
                      generationStatus,
                      recentReports: [newReport, ...state.reports.recentReports.slice(0, 4)]
                    }
                  };
                });
              }, 2000);
            }, 3000);
          }, 3000);
        }, 2000);
      },

      updateReportGenerationStatus: (reportId, updates) => {
        set((state) => {
          const generationStatus = state.reports.generationStatus.map((status) => {
            if (status.id === reportId) {
              return {
                ...status,
                ...updates
              };
            }
            return status;
          });

          return {
            reports: {
              ...state.reports,
              generationStatus
            }
          };
        });
      }
    }),
    {
      name: 'plexifyaec-storage', // localStorage key
      partialize: (state) => ({
        chat: state.chat,
        compliance: state.compliance,
        reports: {
          recentReports: state.reports.recentReports,
          generationStatus: state.reports.generationStatus
        }
      })
    }
  )
);

export default useStore;
